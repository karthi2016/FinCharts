/*

    Some data scenarios:

    2-min updates:
        Nov 10 3:40 pm
        Nov 10 3:42 pm
        Nov 10 3:44 pm
        Nov 10 3:46 pm

    5-min updates:
        Nov 10 3:20 pm
        Nov 10 3:25 pm
        Nov 10 3:30 pm
        Nov 10 3:35 pm


    1-hr updates:
        Nov 10 1:00 pm
        Nov 10 2:00 pm
        Nov 10 3:00 pm
        Nov 10 4:00 pm


    2-hr updates:
        Nov 10 10:00 am
        Nov 10 12:00 pm
        Nov 10 2:00 pm
        Nov 10 4:00 pm


    Daily updates:
        Dec 28 2013 7:00 pm
        Dec 29 2013 7:00 pm
        Dec 30 2013 7:00 pm
        Dec 31 2013 7:00 pm
        Jan 1 2014 7:00 pm
        Jan 2 2014 7:00 pm


    Weekly updates:
        Dec 1 2013
        Dec 8 2013
        Dec 15 2013
        Dec 22 2013
        Dec 29 2013
        Jan 5 2014


    Monthly updates:
        Sep 1 2013
        Oct 1 2013
        Nov 1 2013
        Dec 1 2013
        Jan 1 2014
        Feb 1 2014


    Yearly updates:
        2013
        2014
        2015
        2016



    Logic:

    total labels = width / 100 (1 label per 100px)

    labelsPerPoints = total data points / total labels (1 label per N points)

    YEARLY:
        labelsPerPoints < 0 - add labels for all points
        ELSE
            _.forEach(datapoint, index)
                 if (index % labelsPerPoints === 0)
                        Show YEAR

    MONTHLY:
        labelsPerPoints < 0 - add labels for all points
        ELSE
            - Show label for Year crossovers (JAN)
            - Mark #of labelsPerPoints before and after JAN as blacklist
            - total labels = total labels - year markers
            - Get remaining list
            - Start picking labels one in labelsPerPoints until we hit total labels


    DAILY:
        labelsPerPoints < 0 - add labels for all points
        ELSE
            - Show labels for Year crossovers (JAN)
            - Mark #of labelsPerPoints before and after JAN as blacklist
            - total labels = total labels - year markers

            - Show labels for Month crossovers (JAN, FEB, MAR...)
            - Mark #of labelsPerPoints before and after month crossovers as blacklist
            - total labels = total labels - year markers

            - Get remaining list
            - Start picking labels one in labelsPerPoints until we hit total labels

    HOURLY:
        labelsPerPoints < 0 - add labels for all points
        ELSE
            - Show labels for Year crossovers (JAN)
            - Mark #of labelsPerPoints before and after JAN as blacklist
            - total labels = total labels - year markers

            - Show labels for Month crossovers (JAN, FEB, MAR...)
            - Mark #of labelsPerPoints before and after month crossovers as blacklist
            - total labels = total labels - year markers

            - Show labels for Day crossovers (1, 2, 3, 4...)
            - Mark #of labelsPerPoints before and after month crossovers as blacklist
            - total labels = total labels - year markers

            - Get remaining list
            - Start picking labels one in labelsPerPoints until we hit total labels


    MINUTE:
        labelsPerPoints < 0 - add labels for all points
        ELSE
            - Show labels for Year crossovers (JAN)
            - Mark #of labelsPerPoints before and after JAN as blacklist
            - total labels = total labels - year markers

            - Show labels for Month crossovers (JAN, FEB, MAR...)
            - Mark #of labelsPerPoints before and after month crossovers as blacklist
            - total labels = total labels - year markers

            - Show labels for Day crossovers (1, 2, 3, 4...)
            - Mark #of labelsPerPoints before and after month crossovers as blacklist
            - total labels = total labels - year markers

            - Show labels for Hour crossovers (12:00, 1:00, 2:00, 3:00...)
            - Mark #of labelsPerPoints before and after month crossovers as blacklist
            - total labels = total labels - year markers

            - Get remaining list
            - Start picking labels one in labelsPerPoints until we hit total labels




*/