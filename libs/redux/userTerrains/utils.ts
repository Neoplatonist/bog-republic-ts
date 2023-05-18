/* eslint-disable import/prefer-default-export */
import { UserTerrainsObjectList } from "@/libs/types";

/**
 * Gets a terrain by id from a provided array of terrains
 *
 * @param {UserTerrainsObjectList} arr
 * @param {number} terrainId
 */
export const GetIndexById = (arr: UserTerrainsObjectList, terrainId: number) =>
  arr.findIndex((item) => item.terrainId === terrainId);
