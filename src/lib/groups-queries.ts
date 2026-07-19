import { queryOptions } from "@tanstack/react-query";
import { listGroupsFn } from "./groups.functions";
import type { Group } from "./groups-data";

export const groupsQueryOptions = () =>
  queryOptions({
    queryKey: ["groups"] as const,
    queryFn: () => listGroupsFn(),
    staleTime: 60_000,
  });

export const findGroupBySlug = (groups: Group[], slug: string): Group | undefined =>
  groups.find((g) => g.slug === slug);
