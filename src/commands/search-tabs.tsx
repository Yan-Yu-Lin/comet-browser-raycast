import { List, Icon } from "@raycast/api";
import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import { useCometTabs } from "../hooks/useCometTabs";
import { TabListItem } from "../components/TabListItem";
import { searchEngine } from "../lib/search";

export default function SearchTabs() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 200); // 200ms debounce for optimal performance
  const { tabs, isLoading, refresh } = useCometTabs();

  // Filter tabs based on debounced search text for better performance
  const filteredTabs = useMemo(() => {
    return searchEngine.searchTabs(debouncedSearchText, tabs);
  }, [debouncedSearchText, tabs]);

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search open tabs in Comet..."
      throttle={false} // Disable throttle since we're using debounce
    >
      {filteredTabs.length === 0 && !isLoading ? (
        <List.EmptyView
          icon={Icon.MagnifyingGlass}
          title="No tabs found"
          description={searchText ? "Try a different search term" : "No tabs are currently open in Comet"}
        />
      ) : (
        <List.Section
          title="Open Tabs"
          subtitle={`${filteredTabs.length} ${filteredTabs.length === 1 ? "tab" : "tabs"}`}
        >
          {filteredTabs.map((tab) => (
            <TabListItem key={tab.id} tab={tab} onRefresh={refresh} />
          ))}
        </List.Section>
      )}
    </List>
  );
}
