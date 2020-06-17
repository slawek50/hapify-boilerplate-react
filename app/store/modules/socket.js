import notification from 'antd/lib/notification';

export const SOCKET_BASE_TYPE = 'rswa/socket/';

const NOTIFICATION_RECEIVED = 'rswa/socket/NOTIFICATION_RECEIVED';
const SEND_MESSAGE = 'rswa/socket/SEND_MESSAGE';

export const socketActionsHandlers = {
  [NOTIFICATION_RECEIVED]: (state, action) => {
    notification.info({ message: action.text });
    return state;
  },
};

export function sendSocket (message) {
  return {
    type: SEND_MESSAGE,
    message,
    other: 'other option',
  };
}
