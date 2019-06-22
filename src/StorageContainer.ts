/*
 * Copyright 2019 TD Ameritrade. Released under the terms of the 3-Clause BSD license.  # noqa: E501
 * recur is a trademark of TD Ameritrade IP Company, Inc. All rights reserved.
 */

export const ALL_KEYS = 'ALL_KEYS';

export enum StorageChangeType {
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  CLEARED = 'CLEARED',
  CONTAINER_CHANGE = 'CONTAINER_CHANGE'
}

export interface StorageContainerChange<S = any, V = any> {
  /**
   * The type of change made.
   */
  type: StorageChangeType;
  /**
   * The key that was changed.
   */
  key: string;
  /**
   * The value the key was changed to.
   */
  value: V;
  /**
   * The current state of storage.
   */
  snapshot: S;
}

export type OnChangeHandler = (
  type: StorageChangeType,
  key: string,
  value: any
) => Promise<void>;

/**
 * A container for a persisted storage container.
 * @interface StorageContainer
 */
export interface StorageContainer {
  /**
   * Registers an on change handler that signals a change was made to storage.
   * @param onChange
   */
  registerOnChange(onChange: OnChangeHandler): void;
  /**
   * Invoked when the container is being attached.
   */
  attach(): Promise<void>;
  /**
   * Invoked when the container is being detached.
   */
  detach(): Promise<void>;
  /**
   * Gets an item from storage.
   * @param key
   */
  getItem<T>(key: string): Promise<T | null>;
  /**
   * Sets an item in storage.
   * @param key
   * @param value
   */
  setItem<T>(key: string, value: T): Promise<void>;
  /**
   * Removes an item from storage.
   * @param key
   */
  removeItem(key: string): Promise<void>;
  /**
   * Clears all items from storage.
   */
  clear(): Promise<void>;
  /**
   * Gets all items from storage.
   */
  getAll<T = any>(): Promise<{ [key: string]: T }>;
  /**
   * Determines whether an item exists in storage.
   * @param key
   */
  hasItem(key: string): Promise<boolean>;
}
