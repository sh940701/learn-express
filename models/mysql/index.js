import sequelize from '../../config/mysql.js'
import { User } from './mysqlUser.js'
import { Post } from './mysqlPost.js'
import { Comment } from './mysqlComment.js'

User.hasMany(Post, { foreignKey: 'author' })
Post.belongsTo(User, { foreignKey: 'author', targetKey: 'nickname' })

User.hasMany(Comment, { foreignKey: 'author' })
Comment.belongsTo(User, { foreignKey: 'author', targetKey: 'nickname' })

Post.hasMany(Comment, { foreignKey: 'post_id' })
Comment.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id' })
