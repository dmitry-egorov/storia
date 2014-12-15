class PromiseMock<T>
{
    constructor(private data: T)
    {

    }

    public then(callback)
    {
        callback(this.data);
        return this;
    }

    public catch() {}
}
