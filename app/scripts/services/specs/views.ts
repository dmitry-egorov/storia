module Views
{
    export function author(fb: Firebase)
    {
        return {
            _key: 'authorId',
            _ref: fb.child('profiles'),
            id: FirebaseUtils.getId,
            image: true,
            name: true,
            publisherName: true,
            addedOn: true
        };
    }

    export function getVotes(report: any): number
    {
        return ObjectEx.count(report.upvotedBy);
    }

    export function getReportsCount(event): number
    {
        return ObjectEx.count(event.reports);
    }
}
