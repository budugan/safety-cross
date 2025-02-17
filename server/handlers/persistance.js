const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'safety_cross',
    username: 'root',
    password: 'example',
    port: '3306',
    host: 'localhost'
  });

sequelize.authenticate().then(()=> console.log('db connected')).catch((e)=>console.log("db error",e))

const TipEveniment = sequelize.define(
    "tip_eveniment",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        
        },
        title: {
            type: DataTypes.CHAR,

        },
        color: {
            type: DataTypes.CHAR,

        },
        tag: { type: DataTypes.INTEGER, allowNull: false },
    }
)

const Eveniment = sequelize.define(
    "eveniment",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE
        },
        title: {
            type: DataTypes.CHAR
        },
        description: {
            type: DataTypes.STRING
        },
        evTypeId:{
            type: DataTypes.INTEGER
        },
        tag: { type: DataTypes.INTEGER, allowNull: false },
        
    }
)
TipEveniment.hasOne(Eveniment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'evTypeId',

  });
  Eveniment.belongsTo(TipEveniment, {
   
    foreignKey: 'evTypeId',

  });

(async () => {
    await sequelize.sync({ alter: true });
  })();

module.exports = {Eveniment,TipEveniment};