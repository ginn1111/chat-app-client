import React from 'react';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import withModal from '../../../hoc/withModal';
import { InputInformation } from '../../ui/input/MyInput';
import MyButton from '../../ui/button/MyButton';
import MultipleSelectorChip from '../../ui/select/MultipleSelectorChip';

const NewConversationPanel = ({ onClose }) => {
  return (
    <div className="px-3 h-max  bg-white rounded-md w-full pt-2 pb-5 text-slate-500">
      <h3 className="text-sm font-[500] text-center pb-2">New conversation</h3>
      <InputInformation title="Name" />
      <MultipleSelectorChip />
      <div className="w-full mt-5 gap-x-2 flex">
        <MyButton title="Ok" bgColor="bg-slate-200" width="w-[50%]" />
        <MyButton
          type="button"
          title="Cancel"
          bgColor="bg-slate-800"
          textColor="text-slate-200"
          width="w-[50%]"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

const Header = ({ modal }) => {
  return (
    <>
      <header className="flex justify-between items-center w-full py-1 text-slate-600">
        <div className="w-full flex items-center gap-x-2 ">
          <span className="font-bold">Inbox</span>
          <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-400 font-bold">
            2 New
          </span>
        </div>
        <GroupAddIcon
          className="cursor-pointer"
          sx={{ fontSize: 25 }}
          onClick={modal.openModal}
        />
      </header>
    </>
  );
};

export default withModal(Header, NewConversationPanel);
