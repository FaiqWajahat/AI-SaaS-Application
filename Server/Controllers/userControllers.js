import sqlDatabase from "../Database/db.js"


//  controller for geting all the user's creation 
export const getUserCreations = async (req, res) => {
  try {
    // Get authenticated user
    const { userId } = await req.auth();
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found",
      });
    }

    // Fetch creations for the user
    const creations = await sqlDatabase`
      SELECT * FROM creations 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    // Send successful response
    return res.json({
      success: true,
      creations,
      freeTokens: req.free_usage || 0, // Default to 0 if undefined
    });

  } catch (error) {
    console.error("Error fetching user creations:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


//  controller for geting all the publish creation 
export const getPublishCreations= async (req,res)=>{
try {

const creations= await sqlDatabase `SELECT * FROM creations WHERE publish=true 
ORDER BY created_at DESC`;

return res.json({success:true  , creations})

} catch (error) {
    return res.json({success:false , message: error.message || "Internal server error"})
}

}



export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = await req.auth(); // Clerk user
    const { creationId } = req.body;

    // Get the current likes
    const [creation] = await sqlDatabase`
      SELECT likes FROM creations WHERE id = ${creationId}
    `;

    if (!creation) {
      return res.status(404).json({ success: false, message: "Creation not found" });
    }

    let updatedLikes;

    // Parse likes if they are stored as JSON
    const likes = creation.likes || [];

    if (likes.includes(userId)) {
      // Dislike: Remove userId
      updatedLikes = likes.filter((id) => id !== userId);
    } else {
      // Like: Add userId
      updatedLikes = [...likes, userId];
    }

    // Update DB
    await sqlDatabase`
      UPDATE creations SET likes = ${updatedLikes}  
      WHERE id = ${creationId}
    `;

    return res.json({
      success: true,
      message: likes.includes(userId) ? "Disliked successfully" : "Liked successfully",
      likes: updatedLikes,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
