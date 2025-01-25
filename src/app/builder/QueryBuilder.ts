import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    // Exclude fields from query
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((field) => delete queryObj[field]);

    if ('filter' in queryObj) {
      queryObj.author = queryObj.filter;
      delete queryObj.filter;
    }

    // Filter query
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortBy = this?.query?.sortBy;
    const sortOrder = this?.query?.sortOrder;
    if (sortBy) {
      const sort = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
      this.modelQuery = this.modelQuery.sort(sort as string);
    }
    return this;
  }
}

export default QueryBuilder;
