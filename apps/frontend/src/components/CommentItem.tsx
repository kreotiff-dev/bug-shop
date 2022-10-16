import { Comment as IComment, Role } from '@prisma/client';
import React from 'react';
import { Comment, message, Popconfirm } from 'antd';
import { userAPI } from '../service/user';
import { formateDate } from '../utils/formatData';
import jwt from 'jwt-decode';
import { commentAPI } from '../service/comment';
import CommentModal from './Modal/Comment';

type CommentItemProps = {
  comment: IComment;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const { data: user } = userAPI.useGetByIdQuery(comment.userId);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [removeApi] = commentAPI.useDeleteMutation();
  const token = localStorage.getItem('access_token') || '';
  const fullName =
    user?.name === null || user?.surname === null
      ? 'Пользователь'
      : user?.surname + ' ' + user?.name;
  const onClickRemove = () => {
    removeApi(comment.id)
      .unwrap()
      .then(() => {
        message.success('Ваш отзыв удален');
      })
      .catch((e) => message.error(e.data.message));
  };
  const onClickUpdate = () => {
    setIsVisible(true);
  };
  const userToken: {
    sub: number;
    email: string;
    role: Role;
  } | null = token ? jwt(token) : null;
  const isComment = userToken?.sub === user?.id;
  const remove = isComment ? (
    <Popconfirm title="Удалить?" onConfirm={onClickRemove}>
      <span>Удалить</span>
    </Popconfirm>
  ) : undefined;
  const update = isComment ? (
    <span onClick={onClickUpdate}>Редактировать</span>
  ) : undefined;

  return (
    <>
      <Comment
        actions={[remove, update]}
        author={fullName}
        avatar={`http://dummyimage.com/120`}
        content={comment.comment}
        datetime={<span>{formateDate(comment.updateAt)}</span>}
      />
      <CommentModal
        visible={isVisible}
        setIsVisible={setIsVisible}
        comment={comment}
      />
    </>
  );
};
export default CommentItem;
