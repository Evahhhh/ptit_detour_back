
const sequelize = require("../util/database");
const Avatar = require("./Avatar");
const User = require("./User");
const Image = require("./Image");
const Activity = require("./Activity");
const ActivityStep = require("./ActivityStep");
const Premium = require("./Premium");
const Progress = require("./Progress");
const Child = require("./Child");
const Role = require("./Role");
const ChildProgress = require("./ChildProgress");
const Payment = require("./Payment");
const ProgressStatus = require("./ProgressStatus");
const Category = require("./Category");

// User associations
User.belongsTo(Avatar, { foreignKey: 'avatar_id', as: 'avatar' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
User.belongsTo(Premium, { foreignKey: 'premium_id', as: 'premium' });
User.hasMany(Child, { foreignKey: 'user_id', as: 'children' });
User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' });

// Child associations
Child.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Child.belongsTo(Avatar, { foreignKey: 'avatar_id', as: 'avatar' });
Child.belongsToMany(Progress, { through: ChildProgress, foreignKey: 'child_id', as: 'progress' });

// Activity associations
Activity.belongsTo(Premium, { foreignKey: 'premium_id', as: 'premium' });
Activity.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Activity.hasMany(ActivityStep, { foreignKey: 'activity_id', as: 'steps' });
Activity.hasMany(Image, { foreignKey: 'activity_id', as: 'images' });

// ActivityStep associations
ActivityStep.belongsTo(Activity, { foreignKey: 'activity_id', as: 'activity' });
ActivityStep.hasMany(Image, { foreignKey: 'activity_step_id', as: 'images' });
ActivityStep.hasMany(Progress, { foreignKey: 'activity_step_id', as: 'progress' });

// Image associations
Image.belongsTo(Activity, { foreignKey: 'activity_id', as: 'activity' });
Image.belongsTo(ActivityStep, { foreignKey: 'activity_step_id', as: 'step' });

// Progress associations
Progress.belongsTo(ActivityStep, { foreignKey: 'activity_step_id', as: 'step' });
Progress.belongsTo(ProgressStatus, { foreignKey: 'progress_status_id', as: 'status' });
Progress.belongsToMany(Child, { through: ChildProgress, foreignKey: 'progress_id', as: 'children' });

// Payment associations
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Payment.belongsTo(Premium, { foreignKey: 'premium_id', as: 'premium' });

// Avatar associations
Avatar.hasOne(User, { foreignKey: 'avatar_id', as: 'user' });
Avatar.hasOne(Child, { foreignKey: 'avatar_id', as: 'child' });

// Role associations
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });

// Premium associations
Premium.hasMany(User, { foreignKey: 'premium_id', as: 'users' });
Premium.hasMany(Activity, { foreignKey: 'premium_id', as: 'activities' });
Premium.hasMany(Payment, { foreignKey: 'premium_id', as: 'payments' });

// Category associations
Category.hasMany(Activity, { foreignKey: 'category_id', as: 'activities' });

// ProgressStatus associations
ProgressStatus.hasMany(Progress, { foreignKey: 'progress_status_id', as: 'progress' });


const db = {
    sequelize,
    Avatar,
    User,
    Image,
    Activity,
    ActivityStep,
    Premium,
    Progress,
    Child,
    Role,
    ChildProgress,
    Payment,
    ProgressStatus,
    Category
};

module.exports = db;
