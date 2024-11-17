
# Blog Spot

This is a RESTful API for a blog platform where users can sign up, log in, and manage their profiles. Authors can create, update, delete, and publish blog posts, while readers can view and read blog posts.




## API Reference

## Signup
```http
POST api/v1/user/signup
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required** |
| `avatar`      | `image` | **Required** |
| `email`      | `email` | **Required** |
| `password`      | `string` | **Required** |
| `phone`      | `string` | **Required** |
| `education`      | `string` | **Required** |
| `Role`      | `enum` | **Required** |

#### Description: 
Registers a new user.
#### Response:
    201 Created: User successfully created.
    400 Bad Request: Missing or invalid data.

## Login
```http
POST api/v1/user/login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `email` | **Required** |
| `password`      | `string` | **Required** |
| `Role`      | `enum` | **Required** |

#### Description: 
Authenticates a user.
#### Response:
    200 OK: User logged in successfully. Returns a token for authentication.
    401 Unauthorized: Invalid credentials.

## Logout
```http
GET /api/v1/user/logout
```
#### Description: 
Logs out the current user.
#### Headers: 
    Authorization: Bearer {token}
#### Response:
    200 OK: User logged out successfully.
    401 Unauthorized: Not authenticated..

## Get myProfile
```http
GET /api/v1/user/myprofile
```
#### Description: 
Fetches the logged-in user's profile.
#### Headers: 
    Authorization: Bearer {token}
#### Response:
    200 OK: Returns the user's profile data.
    401 Unauthorized: Not authenticated.

## Get all Authors
```http
GET /api/v1/user/authors
```
#### Description: 
Fetches a list of all authors.
#### Response:
    200 OK: List of authors.

## Create blog
```http
POST api/v1/blog/post
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required** |
| `mainImage`      | `image` | **Required** |
| `intro`      | `string` | **Required** |
| `paraOneImage`      | `image` | **Optional** |
| `paraOneDescription`      | `string` | **Required** |
| `paraOneTitle`      | `string` | **Optional** |
| `paraTwoImage`      | `image` | **Optional** |
| `paraTwoDescription`      | `string` | **Optional** |
| `paraTwoTitle`      | `string` | **Optional** |
| `paraThreeImage`      | `image` | **Optional** |
| `paraThreeDescription`      | `string` | **Optional** |
| `paraThreeTitle`      | `string` | **Optional** |
| `category`      | `string` | **Required** |
| `createdBy`      | `string` | **Required** |
| `authorName`      | `string` | **Required** |
| `authorAvatar`      | `string` | **Optional** |
| `publish`      | `boolean` | **Required** |

#### Description: 
Creates a new blog post (only for Author role).
#### Headers: 
    Authorization: Bearer {token}
#### Response:
    201 Created: Blog post successfully created.
    400 Bad Request: Missing or invalid data.
    401 Unauthorized: Not authorized.

## Get all blogs
```http
GET /api/v1/blog/all
```
#### Description: 
Fetches all blog posts.
#### Response:
    200 OK: List of blog posts.

## Get single blog
```http
GET /api/v1/blog/singleblog/:id
```
#### Description: 
Fetches a single blog post by ID.
#### Response:
    200 OK: The requested blog post.
    404 Not Found: Blog post not found.

## Delete blog
```http
GET /api/v1/blog/delete/:id
```
#### Description: 
Deletes a blog post (only for Author role).
#### Headers: 
    Authorization: Bearer {token}
#### Response:
    200 OK: Blog post deleted successfully.
    404 Not Found: Blog post not found.
    401 Unauthorized: Not authorized.

## Get my blog
```http
GET /api/v1/blog/myblog
```
#### Description: 
Fetches all blog posts by the logged-in author.
#### Headers: 
    Authorization: Bearer {token}
#### Response:
    200 OK: List of blog posts by the logged-in author.
    401 Unauthorized: Not authorized.

## Update blog
```http
PUT api/v1/blog/update/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required** |
| `mainImage`      | `image` | **Required** |
| `intro`      | `string` | **Required** |
| `paraOneImage`      | `image` | **Optional** |
| `paraOneDescription`      | `string` | **Required** |
| `paraOneTitle`      | `string` | **Optional** |
| `paraTwoImage`      | `image` | **Optional** |
| `paraTwoDescription`      | `string` | **Optional** |
| `paraTwoTitle`      | `string` | **Optional** |
| `paraThreeImage`      | `image` | **Optional** |
| `paraThreeDescription`      | `string` | **Optional** |
| `paraThreeTitle`      | `string` | **Optional** |
| `category`      | `string` | **Required** |
| `createdBy`      | `string` | **Required** |
| `authorName`      | `string` | **Required** |
| `authorAvatar`      | `string` | **Optional** |
| `publish`      | `boolean` | **Required** |

#### Description: 
Updates an existing blog post (only for Author role).
#### Headers: 
    Authorization: Bearer {token}
#### Response:
    200 OK: Blog post updated successfully.
    404 Not Found: Blog post not found.
    401 Unauthorized: Not authorized.