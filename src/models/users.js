import { sequelize } from "../config/sequelize";
import { DataTypes, Model } from "sequelize";

export class Users extends Model { }

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.TEXT,
        },
        role: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        modelName: 'users',
        underscored: true,
        timestamp: true,
        sequelize,
    }
);
