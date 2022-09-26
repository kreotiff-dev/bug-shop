import { Comment } from '@prisma/client';
import { Form, Input, message, Modal } from 'antd';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { commentAPI } from '../../service/comment';
import { rules } from '../../utils/rules';

export interface CommentModalProps {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  comment?: Comment;
}

const CommentModal: React.FC<CommentModalProps> = ({
  setIsVisible,
  visible,
  comment: oldComment,
}) => {
  const [form] = Form.useForm();
  const id = useParams()['id'] || '';
  const [create] = commentAPI.useCreateMutation();
  const [update] = commentAPI.useUpdateMutation();
  const [comment, setComment] = React.useState<string>(
    oldComment?.comment || ''
  );

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsVisible(false);
    form.resetFields();
  };
  const submit = () => {
    if (oldComment) {
      update({
        id: oldComment.id,
        comment,
      })
        .unwrap()
        .then(() => {
          message.success('Отзыв обновлен');
          setIsVisible(false);
        })
        .catch((e) => message.error(e.data.message));
    } else {
      create({
        idDevice: parseInt(id),
        comment,
      })
        .unwrap()
        .then(() => {
          message.success('Отзыв отправлен');
          setIsVisible(false);
        })
        .catch((e) => message.error(e.data.message));
    }
  };
  return (
    <Modal
      title={oldComment ? 'Обносить отзыв' : 'Оставить отзыв'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={submit}>
        <Form.Item
          name="text"
          rules={[rules.required()]}
          initialValue={oldComment?.comment || ''}
        >
          <Input.TextArea
            placeholder="Введите Ваш отзыв"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
          />
        </Form.Item>
      </Form>
      <span>{comment.length} / 1000</span>
    </Modal>
  );
};
export default CommentModal;
