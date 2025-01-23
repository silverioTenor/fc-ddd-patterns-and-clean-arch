import {
   Model,
   Column,
   PrimaryKey,
   Table,
   ForeignKey,
   BelongsTo,
   Sequelize,
   DataType,
} from 'sequelize-typescript';
import ProductModel from './product.model';
import OrderModel from './order.model';
// import { DataTypes, Model } from 'sequelize';

// const sequelize = new Sequelize('sqlite::memory:');
// sequelize.addModels([ProductModel, OrderModel]);

// class OrderItemModel extends Model {
//    declare id: string;
//    declare product_id: string;
//    declare product: ProductModel;
//    declare order_id: string;
//    declare order: OrderModel;
//    declare quantity: number;
//    declare product_name: string;
//    declare price: number;
// }

// sequelize.define('order-items', {
//    id: {
//       type: DataType.UUIDV4,
//       allowNull: false,
//       key: 'id',
//       primaryKey: true,
//    },
//    product_id: {
//       type: DataType.UUIDV4,
//       allowNull: false,
//       key: 'product_id',
//    },
//    product: {
//       type: DataType.STRING,
//       allowNull: false,
//       key: 'product',
//    },
//    product_name: {
//       type: DataType.STRING,
//       allowNull: false,
//       key: 'product_name',
//    },
//    order_id: {
//       type: DataType.UUIDV4,
//       allowNull: false,
//       key: 'order_id',
//    },
//    order: {
//       type: DataType.STRING,
//       allowNull: false,
//       key: 'order',
//    },
//    quantity: {
//       type: DataType.INTEGER,
//       allowNull: false,
//       key: 'quantity',
//    },
//    price: {
//       type: DataType.INTEGER,
//       allowNull: false,
//       key: 'price',
//    },
// });

// OrderItemModel.belongsTo(ProductModel, { foreignKey: 'product_id' });
// OrderItemModel.belongsTo(OrderModel, { foreignKey: 'order_id' });

// export default OrderItemModel;

@Table({
   tableName: 'order-items',
   timestamps: false,
})
export default class OrderItemModel extends Model {
   @PrimaryKey
   @Column
   declare id: string;

   @ForeignKey(() => ProductModel)
   @Column({ allowNull: false })
   declare product_id: string;

   @BelongsTo(() => ProductModel)
   declare product: ProductModel;

   @ForeignKey(() => OrderModel)
   @Column({ allowNull: false })
   declare order_id: string;

   @BelongsTo(() => OrderModel)
   declare order: Awaited<OrderModel>;

   @Column({ allowNull: false })
   declare product_name: string;

   @Column({ allowNull: false })
   declare quantity: number;

   @Column({ allowNull: false })
   declare price: number;
}
