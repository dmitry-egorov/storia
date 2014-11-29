module StoriaApp
{
    export class ReportFactory
    {
        static create(data): Report
        {
            return new Report(data.id, data.content, data.author, data.votes);
        }
    }
}
