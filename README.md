# social-network-api
This is a simple social network API built using MongoDB. </br>

Users can use the following api routes to create, edit, delete data in the database. </br>

## Installation
Use "npm install" to install all dependencies. </br>

## API Routes
/api/users </br>
Get - get all users </br>
Post - create a new user </br>

/api/:userId </br>
Get single user </br>
Update User info </br>
Delete user </br>

/api/:userId/friends/:friendId </br>
Make two users friend 

/api/thoughts </br>
Get - get all thoughts</br>
Post - post a new thought </br>

/api/:thoughtId </br>
get, delete, edit the thought content using thoughtId </br>

/api/:thoughtId/reaction </br>
Add and delete a comment on the thought 

## Links

Github Repo: https://github.com/shuczhu/social-network-api </br>

Video Walkthrough: https://drive.google.com/file/d/1veXGCdCDzH013Dmhf4wOajVsiPSdS_Ty/view
</br>