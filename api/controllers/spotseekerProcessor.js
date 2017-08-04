'use strict';

// returns a dict to be directly searched against the DB.

// NOT YET IMPLEMENTED:
//   -- extended_info:noise_level [ORG-FILTERS]
//   -- open_now [SEARCH]
//   -- open_until [SEARCH]
//   -- open_at [SEARCH]
//   -- fuzzy_hours_end [SEARCH]
//   -- fuzzy_hours_start [SEARCH]
//   -- item:extended_info [SEARCH]
//   -- item: [SEARCH]
//   -- extended_info: [SEARCH]
//   -- latitude <any>, longitude <any>, distance [SEARCH]

exports.process_filters = function(filters) {
    var processed = {};
    // filters are mapped based on request query as key
    // with a dict as the value. The dict contains a "filter","term","operator"
    // and "custom" as keys.
    // The "filter" key contains the filter to searched against the DB.
    // The "term" key is present in the dict if the value to be tested
    // is custom rather being part of the query.
    // The "operator" key is present if the value to be tested requires a custom
    // operator.
    // The "custom" key is present if a custom series of actions need to take place.
    // "custom" points to a method to be executed with the value as a parameter and
    // return used as a search term.
    var map = {
        "extended_info:campus": {
            "filter": "extended_info.campus"
        },
        "extended_info:app_type": {
            "filter": "extended_info.app_type"
        },
        "extended_info:uwgroup": {
            "filter": "extended_info.uwgroup",
            "operator": "$in"
        },
        "extended_info:reservable": {
            "filter": "extended_info.reservable",
            "term": ["true", "reservations"],
            "operator": "$in"
        },
        "capacity": {
            "custom": process_filters_capacity
        },
        "type": {
            "filter": "type",
            "operator": "$in"
        },
        "building_name": {
            "filter": "location.building_name",
            "operator": "$in"
        },
        "extended_info:or_group": {
            "custom": process_filters_extended_info_or_group
        },
        "id": {
            "filter": "id",
            "operator": "$in"
        },
    };

    var explicit_and = [];
    // for study, make sure to return spots without any app_type
    if (!("extended_info:app_type" in filters)) {
        explicit_and.push({ "extended_info.app_type": { "$exists": false }});
    }

    // iterate through all requested filters and construct a query
    Object.keys(filters).forEach(function(key) {
        if (key in map) {
            var map_dict = map[key];
            if ("custom" in map_dict) {
                // get processod value from custom method
                explicit_and.push(map_dict["custom"](filters[key]));
            } else if ("filter" in map_dict) {
                // even though checking if filter is in dict is not required,
                // this prevents unwanted errors.
                var obj = {};
                var term = filters[key];
                if ("term" in map_dict) {
                    term = map_dict["term"];
                }
                if ("operator" in map_dict) {
                    var operated = {};
                    operated[map_dict["operator"]] = term;
                    obj[map_dict["filter"]] = operated;
                } else {
                    obj[map_dict["filter"]] = term;
                }
                explicit_and.push(obj);
            }
        }
    });
    processed = { "$and": explicit_and };

    return processed;
};

// implement limit and concept of pages
exports.get_limit_and_skip = function(filters) {
    var response = { "limit": 0, "skip": 0 };
    if ("limit" in filters) {
        var limit = filters["limit"];
        if (!isNaN(limit) && Number(limit) > 0) {
            limit = Number(limit);
            response["limit"] = limit;
            if ("page" in filters && !isNaN(filters["page"]) && Number(filters["page"]) >= 1) {
                response["skip"] = (Number(filters["page"]) - 1) * limit;
            }
        }
    }
    return response;
};

function process_filters_capacity(value) {
    // use 0 as value if a non-valid integer value is passed as a search term
    if (isNaN(value)) {
        value = 0;
    }
    value = Number(value);
    return { "$or": [ { "capacity": { "$gte": value } }, { "capacity": null } ] };
};

function process_filters_extended_info_or_group(values) {
    if (typeof values === "string") {
        values = [values];
    }
    var or = [];
    values.forEach(function(value) {
        var obj = {};
        obj["extended_info." + value] = "true";
        or.push(obj);
    });
    return { "$or": or };
};
