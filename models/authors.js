'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Author extends Model {


        static associate(models) {
            // define association here
        }
    }
    Author.init({
        authorId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Author',
    });
    return Author;
};