// Finder.js 
import React, { useState } from "react";
import TweetEmbed from "react-tweet-embed";
import { useSelector, useDispatch } from "react-redux";

import { Flex, Input, IconButton, Wrap, WrapItem } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { fetchTweets } from "./finderSlice";

export function Finder() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  // retrieve tweets and isLoading from the redux store 
  const { tweets, isLoading } = useSelector((state) => state.finder);

  // retrieve numberOfResults from redux store 
  const numberOfResults = useSelector((state) => state.numberOfResults);

  const handleSearch = async () => {
    if (searchValue) {
      // dispatch the thunk with state values
      setSearchValue("");
      dispatch(fetchTweets(searchValue, numberOfResults));
    }
  };

  return (
    <>
      <Flex alignItems="center">
        <Input
          value={searchValue}
          onChange={(evt) => setSearchValue(evt.target.value)}
          placeholder="enter a theme or hashtag to search"
          size="lg"
          mr={3}
        />
        <IconButton
          colorScheme="blue"
          aria-label="Search Twitter"
          icon={<SearchIcon />}
          onClick={handleSearch}
        />
      </Flex>

      {/* render a loading UI, Make sure to import Stack and Skeleton from chakra-ui */}
      {isLoading && (
        <Stack mt={5}>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}

      <Wrap mt={5}>
        {tweets.map((tweet) => (
          <WrapItem key={tweet.id}>
            <TweetEmbed id={tweet.id} />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}