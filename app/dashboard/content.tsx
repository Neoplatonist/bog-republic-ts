'use client';

import React, { useMemo } from 'react';
import { useTypedSelector } from '@/libs/redux';
import { selectTerrains, selectTerrainErrors } from '@/libs/redux/terrains';
import { selectUserTerrains } from '@/libs/redux/userTerrains';
import UserCard from '@/components/UserCard';
import TerrainCard from '@/components/TerrainCard';
import {
  TerrainObjectList,
  UserTerrainsObjectList,
  TerrainObject,
  UserTerrainData,
  CombinedTerrain,
} from '@/libs/types';

const DashboardContent = () => {
  const terrains = useTypedSelector(selectTerrains) as TerrainObjectList;
  const terrainErrors = useTypedSelector(selectTerrainErrors);
  const userTerrains = useTypedSelector(
    selectUserTerrains
  ) as UserTerrainsObjectList;

  if (terrainErrors?.length) {
    terrainErrors?.map((error) => {
      throw new Error(error);
    });
  }

  // Create a filtered and combined list of terrains based on user terrains
  const userMatchedTerrains = useMemo<CombinedTerrain[]>(() => {
    if (!terrains?.length) {
      return [];
    }

    // Default user terrain data - using imported UserTerrainData type
    const createDefaultUserTerrain = (
      terrain: TerrainObject
    ): UserTerrainData => ({
      currentIncome: terrain.income || 0,
      currentIncomeNotation: terrain.incomeNotation || 0,
      nextCost: terrain.baseCost || 0,
      nextCostNotation: terrain.baseCostNotation || 0,
      numberOwned: 0,
      isContributionLocked: false,
      isManaged: false,
    });

    // If userTerrains is empty or undefined, default to first terrain
    if (!userTerrains || Object.keys(userTerrains).length === 0) {
      return terrains.slice(0, 1).map((terrain) => ({
        ...terrain,
        userTerrain: createDefaultUserTerrain(terrain),
      }));
    }

    // Extract terrain IDs from userTerrains
    const userTerrainIds = Object.values(userTerrains)
      .map((terrain) => terrain.terrainId || terrain.id) // Use terrainId from our schema
      .filter(Boolean);

    // Filter terrains that the user has access to based on ID
    const matchedTerrains = terrains
      .filter(
        (terrain) =>
          // Check if the terrain ID exists in the user's terrains
          terrain.id && userTerrainIds.includes(terrain.id)
      )
      .map((terrain) => {
        // Find user terrain by matching terrainId to terrain.id
        const userTerrain = Object.values(userTerrains).find(
          (ut) => (ut.terrainId || ut.id) === terrain.id
        );

        // Merge terrain data with user-specific terrain data
        return {
          ...terrain,
          userTerrain: userTerrain
            ? {
                // Extract only the UserTerrainData properties from userTerrain
                currentIncome: userTerrain.currentIncome || 0,
                currentIncomeNotation: userTerrain.currentIncomeNotation || 0,
                nextCost: userTerrain.nextCost || 0,
                nextCostNotation: userTerrain.nextCostNotation || 0,
                numberOwned: userTerrain.numberOwned || 1,
                isContributionLocked: userTerrain.isContributionLocked || false,
                isManaged: userTerrain.isManaged || false,
              }
            : createDefaultUserTerrain(terrain),
        };
      });

    // Ensure at least one terrain is returned with proper user properties
    if (matchedTerrains.length > 0) {
      return matchedTerrains;
    }

    // Add default user terrain properties to the first terrain
    return terrains.slice(0, 1).map((terrain) => ({
      ...terrain,
      userTerrain: createDefaultUserTerrain(terrain),
    }));
  }, [terrains, userTerrains]);

  return (
    <>
      <UserCard />

      <ul className="mx-0 my-4 p-0 list-none">
        {userMatchedTerrains.map((terrain, index) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TerrainCard key={terrain.id || `terrain-${index}`} {...terrain} />
        ))}
      </ul>
    </>
  );
};

export default DashboardContent;
