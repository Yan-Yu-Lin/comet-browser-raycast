/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-tabs` command */
  export type SearchTabs = ExtensionPreferences & {}
  /** Preferences accessible in the `search-history` command */
  export type SearchHistory = ExtensionPreferences & {}
  /** Preferences accessible in the `search-comet` command */
  export type SearchComet = ExtensionPreferences & {}
  /** Preferences accessible in the `new-tab` command */
  export type NewTab = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-tabs` command */
  export type SearchTabs = {}
  /** Arguments passed to the `search-history` command */
  export type SearchHistory = {}
  /** Arguments passed to the `search-comet` command */
  export type SearchComet = {}
  /** Arguments passed to the `new-tab` command */
  export type NewTab = {}
}

