export type IOrder = {
      _id: string;
      totalQuantity: number;
      totalAmount: number;
      isPending?: boolean;
      orderType?: string;
      orderNumber?: string;
      user: string;
      createdAt?: Date;
      updatedAt?: Date;
    };
    