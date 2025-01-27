import {
   Model,
   Column,
   PrimaryKey,
   Table,
   ForeignKey,
   BelongsTo,
   HasMany,
} from 'sequelize-typescript';
// import { DataTypes, Model, Sequelize } from 'sequelize';
import OrderItemModel from './order-item.model';
import CustomerModel from '@infra/customer/db/sequelize/model/customer.model';

// const sequelize = new Sequelize('sqlite::memory:');
// sequelize.addModels([CustomerModel, OrderItemModel]);

// class OrderModel extends Model {
//    declare id: string;
//    declare customer_id: string;
//    declare customer: CustomerModel;
//    declare items: OrderItemModel[];
//    declare total: number;
// }

// sequelize.define('orders', {
//    id: {
//       type: DataType.UUIDV4,
//       allowNull: false,
//       primaryKey: true,
//       key: 'id',
//    },
//    customer_id: {
//       type: DataType.UUIDV4,
//       allowNull: false,
//       key: 'customer_id',
//    },
//    customer: {
//       type: DataType.STRING,
//       allowNull: false,
//       key: 'customer',
//    },
//    items: {
//       type: DataType.ARRAY,
//       allowNull: false,
//       key: 'items',
//    },
//    total: {
//       type: DataType.INTEGER,
//       allowNull: false,
//       key: 'total',
//    },
// });

// OrderModel.belongsTo(CustomerModel, { foreignKey: 'customer_id' });
// OrderModel.hasMany(OrderItemModel, { sourceKey: 'items' });
// OrderModel.build();

// export default OrderModel;

@Table({
   tableName: 'orders',
   timestamps: false,
})
export default class OrderModel extends Model {
   @PrimaryKey
   @Column
   declare id: string;

   @ForeignKey(() => CustomerModel)
   @Column({ allowNull: false })
   declare customer_id: string;

   @BelongsTo(() => CustomerModel)
   declare customer: CustomerModel;

   @HasMany(() => OrderItemModel)
   declare items: Awaited<OrderItemModel[]>;
   // declare items: ReturnType<() => OrderItemModel[]>;

   @Column({ allowNull: false })
   declare total: number;
}
