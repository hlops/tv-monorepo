const DEFAULT_PAGE_SIZE = 10;

export class QueryParams {
    public page = 0;
    public pageSize = DEFAULT_PAGE_SIZE;
    public query = '';

    constructor(options: _.Dictionary<string>) {
        this.page = Number(options.page);
        if (isNaN(this.page)) {
            this.page = 0;
        }

        this.pageSize = Number(options.pageSize);
        if (isNaN(this.pageSize)) {
            this.pageSize = DEFAULT_PAGE_SIZE;
        }

        this.query = options.query || '';
    }
}