import Fuse from "fuse.js";
import { CometTab, CometHistoryEntry, SearchResult } from "./types";

export class SearchEngine {
  private fuseOptions: Fuse.IFuseOptions<SearchResult> = {
    keys: [
      { name: "data.title", weight: 0.4 },
      { name: "data.url", weight: 0.6 },
    ],
    threshold: 0.3,
    includeScore: true,
    shouldSort: true,
    minMatchCharLength: 1,
    distance: 100,
    useExtendedSearch: true,
    ignoreLocation: true,
  };

  search(query: string, tabs: CometTab[], history: CometHistoryEntry[]): SearchResult[] {
    if (!query.trim()) {
      // Return all results with tabs prioritized when no search query
      return [
        ...tabs.map((tab) => ({ type: "tab" as const, data: tab, score: 0 })),
        ...history.slice(0, 20).map((entry) => ({ type: "history" as const, data: entry, score: 0 })),
      ];
    }

    // Convert to SearchResult format
    const searchItems: SearchResult[] = [
      ...tabs.map((tab) => ({ type: "tab" as const, data: tab })),
      ...history.map((entry) => ({ type: "history" as const, data: entry })),
    ];

    const fuse = new Fuse(searchItems, this.fuseOptions);
    const results = fuse.search(query);

    // Custom sorting: tabs first, then by relevance score
    return results
      .map((result) => ({
        ...result.item,
        score: result.score || 0,
      }))
      .sort((a, b) => {
        // Tabs always come before history
        if (a.type === "tab" && b.type === "history") return -1;
        if (a.type === "history" && b.type === "tab") return 1;

        // Within same type, sort by score (lower is better with Fuse.js)
        return (a.score || 0) - (b.score || 0);
      });
  }

  searchTabs(query: string, tabs: CometTab[]): CometTab[] {
    if (!query.trim()) {
      return tabs;
    }

    const fuseOptions: Fuse.IFuseOptions<CometTab> = {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "url", weight: 0.6 },
      ],
      threshold: 0.3,
      includeScore: true,
      shouldSort: true,
      minMatchCharLength: 1,
    };

    const fuse = new Fuse(tabs, fuseOptions);
    return fuse.search(query).map((result) => result.item);
  }

  searchHistory(query: string, history: CometHistoryEntry[]): CometHistoryEntry[] {
    if (!query.trim()) {
      return history;
    }

    const fuseOptions: Fuse.IFuseOptions<CometHistoryEntry> = {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "url", weight: 0.6 },
      ],
      threshold: 0.3,
      includeScore: true,
      shouldSort: true,
      minMatchCharLength: 1,
    };

    const fuse = new Fuse(history, fuseOptions);
    return fuse.search(query).map((result) => result.item);
  }
}

export const searchEngine = new SearchEngine();
