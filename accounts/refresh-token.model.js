const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        token: {type: DataTypes.STRING},
        expires: { type: DataTypes.DATE},
        created: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
        revoked: { type: DataTypes.STRING},
        revokedByIp: {type: DataTypes.STRING},
        replacedByToken: {type: DataTypes.STRING},
        isExpired: {
            type: DataTypes.VIRTUAL,
            get() { return Date.now() >= this.expires; }
        },
        isActive: {
            type: DataTypes.VIRTUAL,
            get() {return !this.revoked && !this.isExpired; }
        }
    };
    
    const options = {
        //disable default timestamp field (createdAt and updatedAt)
        timestamp: false
    };
    
    return sequelize.define('refreshToken', attributes, options);
}