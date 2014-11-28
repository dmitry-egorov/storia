module StoriaApp
{
    export class Event
    {
        constructor(public id: string, public title: string, public reports: Array<Report>) {}

        getReportOf(profileId: string): Report
        {
            return this.reports.first(x => x.author.id == profileId);
        }
    }
}
