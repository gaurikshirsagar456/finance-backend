export declare const transactionSelectFields: {
    readonly id: true;
    readonly amount: true;
    readonly type: true;
    readonly category: true;
    readonly date: true;
    readonly description: true;
    readonly isDeleted: true;
    readonly createdBy: true;
    readonly createdAt: true;
    readonly updatedAt: true;
};
export declare const transactionWithUserSelect: {
    readonly user: {
        readonly select: {
            readonly id: true;
            readonly name: true;
            readonly email: true;
        };
    };
    readonly id: true;
    readonly amount: true;
    readonly type: true;
    readonly category: true;
    readonly date: true;
    readonly description: true;
    readonly isDeleted: true;
    readonly createdBy: true;
    readonly createdAt: true;
    readonly updatedAt: true;
};
//# sourceMappingURL=transaction.model.d.ts.map