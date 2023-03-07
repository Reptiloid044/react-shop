import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classes from './Comments.module.scss';
import { Loader } from '../Loader/Loader';
import { Comment } from '../../types/comment';
import * as commentsActions from '../../features/commentReducer';
import { useParams } from 'react-router-dom';
import { createComment } from '../../api';
import { deleteComment } from '../../api';


export const Comments: React.FC<Comment> = () => {
  const { phoneId } = useParams()
  const [newComment, setNewCommment] = useState('');
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments.comments) as Comment[];
  const loading = useAppSelector(state => state.comments.loading);
  const error = useAppSelector(state => state.comments.error);
  const addComment = (commentToAdd: Comment) => dispatch(commentsActions.add(commentToAdd));
  const removeComment = (commentToRemove: number) => dispatch(commentsActions.take(commentToRemove));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newComment || !phoneId) {
      return;
    };

    try {
    const comment = await createComment(newComment, parseInt(phoneId));
      addComment(comment);
      setNewCommment('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
    const removeCommentById = await deleteComment(id)
    
    removeComment(removeCommentById)
  } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!phoneId) {
      return;
    }

    dispatch(commentsActions.init(parseInt(phoneId)))
  }, []);

  if (loading) {{
    return <Loader />
  }};

  if (error) {
    return <p>{error}</p>
  };

  return (
    <div className={classes.card__comments}>
      <div className={classes.card__bodybox}>
        <div className={classes.card__chatborder}>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="chat" 
              className={classes.card__chatbox} 
              id="chatbox" 
              value={newComment}
              onChange={event => setNewCommment(event.target.value)}
              placeholder="Hi there! Add comment"
            />
            <button type="submit" className={classes.card__addComment}>Add</button>
          </form>
          <ul className={classes.comment__list}>
          {comments.map((comment: Comment) => (
            <li key={comment.id} className={classes.comment__item}>
              <p className={classes.comment__text}>
                {comment.description}
              </p>
              <button
                onClick={() => handleDelete(comment.id)} 
                className={classes.comment__delete}
              />
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  )
};
