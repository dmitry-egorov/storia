module StoriaApp
{
    export class Event
    {
        constructor(public id: string, public title: string, public reports: Array<Report>) {}

        isCoveredBy(id: string): boolean
        {
            return this.reports.any(x => x.author.id == id);
        }
    }
}
