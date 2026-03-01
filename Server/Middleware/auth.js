// Here we add free_usage and subscription Plan in the request

import { clerkClient } from "@clerk/express";

export const authUser = async (req, res, next) => {
  const { userId, has } = await req.auth();

  const hasPremiumPlan = await has({ plan:"premium" });
  

  const user = await clerkClient.users.getUser(userId);

  try {
    if (
      !hasPremiumPlan &&
      user.privateMetadata &&
      typeof user.privateMetadata.free_usage !== "undefined"
    ) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    const plan = hasPremiumPlan ? "premium" : "free";
    req.plan = plan;
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
