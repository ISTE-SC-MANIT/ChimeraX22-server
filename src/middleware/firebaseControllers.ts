import UserModel, { User } from '../models/user';
import * as express from 'express';
import { nanoid } from 'nanoid';
import env from 'dotenv';
env.config();

export const firebaseSignupController = async (
  req: express.Request,
  res: express.Response
) => {
  const { uid, name, email, strategy } = req.body;
  try {
    new UserModel({
      name: name,
      firebase_uid: uid,
      email: email,
      strategy: strategy,
    })
      .save()
      .then((user) => {
        if (Boolean(user)) {
          return res
            .status(200)
            .json({ user: { _id: user._id, email: user.email } });
        } else {
          console.log('user not created');
        }
      })
      .catch((e) => {
        return res.status(500).json({
          errors: 'Something went wrong',
        });
      });
  } catch (error) {
    return res.status(500).json({
      errors: 'Something went wrong',
    });
  }
};