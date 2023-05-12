/* eslint-disable @typescript-eslint/await-thenable */
import create from "zustand";

import { api, type RouterOutputs } from "../utils/api";

type TopicStoreType = RouterOutputs["topic"]["getAll"][0];

type TopicCounterType = number;

export type Store = {
  selectedTopic: TopicStoreType | undefined;
  setSelectedTopic: (selectedTopic: TopicStoreType) => void;
  topicsCounter: TopicCounterType;
  setTopicsCounter: () => Promise<void>;
};

const setTopicCounter = async () => {
  const { data: topics } = await api.topic.getAll.useQuery();
  return topics?.length ?? 0;
};

export const useStore = create<Store>((set) => ({
  selectedTopic: undefined,
  setSelectedTopic: (selectedTopic: TopicStoreType) => set({ selectedTopic }),
  
  topicsCounter: 0,
  setTopicsCounter: async () => {
    const topicsCounter = await setTopicCounter();
    set({ topicsCounter });
  },
}));
