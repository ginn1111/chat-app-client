import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getConversationList } from '@services/conversation';
import useAPI from '@hooks/useAPI';
import { userIdSelector } from '@app/selectors';

const useConversationList = () => {
  const userId = useSelector(userIdSelector);
  const { isLoading, error, data, requestFn } = useAPI({
    requestFn: getConversationList.bind(null, { userId }),
  });

  useEffect(() => {
    requestFn();
  }, []);

  return { isLoading, error, conversationList: data?.data };
};

export default useConversationList;
