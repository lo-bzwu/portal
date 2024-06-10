# LO-Portal

Dies ist das Informationsportal der Lernendenorganisation am BZWU. 

## Building

```bash
docker run --name lo-bzwu-portal -p 8080:8080 lo-bzwu/portal -d
```

## Deployment

```bash
# docker build -t lo-portal .
docker run -p 8080:8080 ghcr.io/lo-bzwu/portal
```


PocketBase Collections:

```json
[
    {
        "id": "uvz5gzs6alsaivc",
        "name": "links",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "fezykdxr",
                "name": "label",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "qoyvifz5",
                "name": "url",
                "type": "url",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "exceptDomains": null,
                    "onlyDomains": null
                }
            },
            {
                "system": false,
                "id": "h1k10ydy",
                "name": "preview",
                "type": "file",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "mimeTypes": [],
                    "thumbs": [],
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "protected": false
                }
            },
            {
                "system": false,
                "id": "riuyqair",
                "name": "color",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": 7,
                    "max": 7,
                    "pattern": "#[\\dA-Fa-f]{5}"
                }
            },
            {
                "system": false,
                "id": "c1q3qvdr",
                "name": "classes",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "siapriw0",
                "name": "order",
                "type": "number",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "noDecimal": false
                }
            }
        ],
        "indexes": [],
        "listRule": "",
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "4rican7saizg27k",
        "name": "topic_feed",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "5fhjohjz",
                "name": "content",
                "type": "editor",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "convertUrls": false
                }
            },
            {
                "system": false,
                "id": "2cymhvzx",
                "name": "topic",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "qbwxccto38j3kil",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            }
        ],
        "indexes": [],
        "listRule": "",
        "viewRule": "",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "qbwxccto38j3kil",
        "name": "topics",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "yep6ia4j",
                "name": "title",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "6drzr9x6",
                "name": "locations",
                "type": "select",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSelect": 3,
                    "values": [
                        "Wil",
                        "Uzwil",
                        "Flawil"
                    ]
                }
            },
            {
                "system": false,
                "id": "m2manwlo",
                "name": "classes",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "xb4kxbsf",
                "name": "status",
                "type": "select",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "values": [
                        "none",
                        "ongoing",
                        "done"
                    ]
                }
            },
            {
                "system": false,
                "id": "7ptcjjml",
                "name": "highlight",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            }
        ],
        "indexes": [],
        "listRule": "",
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "h4h7dp559icc6x4",
        "name": "council_members",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "ufshaevm",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "tydoiugl",
                "name": "role",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "mlugpes9",
                "name": "image",
                "type": "file",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "mimeTypes": [],
                    "thumbs": [],
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "protected": false
                }
            },
            {
                "system": false,
                "id": "uqllfwpg",
                "name": "email",
                "type": "email",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "exceptDomains": [],
                    "onlyDomains": []
                }
            },
            {
                "system": false,
                "id": "8adosei0",
                "name": "highlight",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            }
        ],
        "indexes": [],
        "listRule": "@request.auth.id != \"\"",
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "up1c3fiku9xtzpj",
        "name": "commissions",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "3fvk5wjj",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "gbtlmzn6",
                "name": "description",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "z2ip659l",
                "name": "leader",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "89g2dij42qnxxkf",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            },
            {
                "system": false,
                "id": "jpbllujc",
                "name": "council_leader",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "h4h7dp559icc6x4",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            }
        ],
        "indexes": [],
        "listRule": "@request.auth.id != \"\"",
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "89g2dij42qnxxkf",
        "name": "commission_members",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "h9vvytsw",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "wolu9cum",
                "name": "image",
                "type": "file",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "mimeTypes": [],
                    "thumbs": [
                        "50x50"
                    ],
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "protected": false
                }
            },
            {
                "system": false,
                "id": "ojzuw9xc",
                "name": "role",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "byvelisy",
                "name": "email",
                "type": "email",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "exceptDomains": null,
                    "onlyDomains": null
                }
            },
            {
                "system": false,
                "id": "8y48pre5",
                "name": "commission",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "up1c3fiku9xtzpj",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            }
        ],
        "indexes": [],
        "listRule": null,
        "viewRule": "@request.auth.id != \"\"",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "s8yhwxi623agg47",
        "name": "submissions",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "ztx9cwhg",
                "name": "createdBy",
                "type": "relation",
                "required": true,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "_pb_users_auth_",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            },
            {
                "system": false,
                "id": "hgiuvktr",
                "name": "content",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            }
        ],
        "indexes": [],
        "listRule": null,
        "viewRule": null,
        "createRule": "@request.data.createdBy = @request.auth.id",
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "61r7vokkjjlykxn",
        "name": "meetings",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "pbfhuqvu",
                "name": "date",
                "type": "date",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": "",
                    "max": ""
                }
            },
            {
                "system": false,
                "id": "t7dtooxh",
                "name": "title",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "avcxuh0s",
                "name": "content",
                "type": "editor",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "convertUrls": false
                }
            },
            {
                "system": false,
                "id": "ebyi0txv",
                "name": "summary",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "pygyo6pz",
                "name": "link",
                "type": "url",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "exceptDomains": null,
                    "onlyDomains": null
                }
            },
            {
                "system": false,
                "id": "bvunejt1",
                "name": "protocol_link",
                "type": "url",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "exceptDomains": null,
                    "onlyDomains": null
                }
            },
            {
                "system": false,
                "id": "qrwmbpvy",
                "name": "ended",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            }
        ],
        "indexes": [],
        "listRule": "@request.auth.id != \"\"",
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "aebnoivrvfe7ar9",
        "name": "posts",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "0pjj55rt",
                "name": "title",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "glmbdwuk",
                "name": "subtitle",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "0ymdzqmq",
                "name": "content",
                "type": "editor",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "convertUrls": false
                }
            },
            {
                "system": false,
                "id": "akxze3va",
                "name": "locations",
                "type": "select",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSelect": 2,
                    "values": [
                        "Wil",
                        "Uzwil",
                        "Flawil"
                    ]
                }
            },
            {
                "system": false,
                "id": "phjzlefz",
                "name": "published",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            },
            {
                "system": false,
                "id": "10za2aup",
                "name": "image",
                "type": "file",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "mimeTypes": [
                        "image/png",
                        "image/jpeg"
                    ],
                    "thumbs": [
                        "720x720"
                    ],
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "protected": false
                }
            }
        ],
        "indexes": [],
        "listRule": "@request.auth.id != \"\" && published = true",
        "viewRule": "@request.auth.id != \"\"",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "jucxeamfsvx0w0z",
        "name": "intro_faq",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "0wbfkuru",
                "name": "question",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "anuzxx4o",
                "name": "answer",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "3hnhg6fc",
                "name": "order",
                "type": "number",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "noDecimal": true
                }
            }
        ],
        "indexes": [],
        "listRule": "",
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "_pb_users_auth_",
        "name": "users",
        "type": "auth",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "users_name",
                "name": "firstName",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "sfdbba3j",
                "name": "lastName",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "v5jbjpgz",
                "name": "userSelectedClasses",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 2000000
                }
            },
            {
                "system": false,
                "id": "tnublb2m",
                "name": "classes",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 2000000
                }
            },
            {
                "system": false,
                "id": "edjrws96",
                "name": "isLocalTenant",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            },
            {
                "system": false,
                "id": "qbsyjzbm",
                "name": "isLocalStudent",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            },
            {
                "system": false,
                "id": "gmlxo9r0",
                "name": "introComplete",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            },
            {
                "system": false,
                "id": "ddh5vc2c",
                "name": "teacherCode",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            }
        ],
        "indexes": [],
        "listRule": "id = @request.auth.id",
        "viewRule": "id = @request.auth.id",
        "createRule": "",
        "updateRule": "@request.data.username:isset = false && @request.data.email:isset = false && @request.data.firstName:isset = false && @request.data.lastName:isset = false && @request.data.classes:isset = false && @request.data.isLocalStudent:isset = false && @request.data.isLocalTenant:isset = false",
        "deleteRule": null,
        "options": {
            "allowEmailAuth": true,
            "allowOAuth2Auth": true,
            "allowUsernameAuth": false,
            "exceptEmailDomains": null,
            "manageRule": null,
            "minPasswordLength": 8,
            "onlyEmailDomains": [
                "bzwu.ch",
                "cl02.ch"
            ],
            "onlyVerified": false,
            "requireEmail": false
        }
    },
    {
        "id": "3pkg1c1p9ployci",
        "name": "poll_options",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "wg3vxndb",
                "name": "polls",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "ybctw4pd9r4em3g",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            },
            {
                "system": false,
                "id": "otnvbiqh",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "hqygdhxs",
                "name": "subtitle",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "iqyl67td",
                "name": "image",
                "type": "file",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "mimeTypes": [],
                    "thumbs": [],
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "protected": false
                }
            }
        ],
        "indexes": [],
        "listRule": null,
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "va7t3y3teqezl4o",
        "name": "poll_votes",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "zmowjrf7",
                "name": "poll",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "ybctw4pd9r4em3g",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            },
            {
                "system": false,
                "id": "uafoe6ww",
                "name": "user",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "_pb_users_auth_",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            },
            {
                "system": false,
                "id": "ox6lemkt",
                "name": "options",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "3pkg1c1p9ployci",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": null,
                    "displayFields": null
                }
            }
        ],
        "indexes": [
            "CREATE UNIQUE INDEX `idx_D3VRgFM` ON `poll_votes` (\n  `poll`,\n  `user`\n)"
        ],
        "listRule": null,
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "ybctw4pd9r4em3g",
        "name": "polls",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "dln7wpcu",
                "name": "visible",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            },
            {
                "system": false,
                "id": "hk3e17vj",
                "name": "ended",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            },
            {
                "system": false,
                "id": "xahntcaa",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "ks8v2fyc",
                "name": "maxSelections",
                "type": "number",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "noDecimal": false
                }
            }
        ],
        "indexes": [],
        "listRule": null,
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "sqhgsqky8n92ms1",
        "name": "notices",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "jz9ph5uy",
                "name": "visible",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            },
            {
                "system": false,
                "id": "4jywxq7m",
                "name": "content",
                "type": "editor",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "convertUrls": false
                }
            },
            {
                "system": false,
                "id": "yeaocyhg",
                "name": "link",
                "type": "url",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "exceptDomains": null,
                    "onlyDomains": null
                }
            },
            {
                "system": false,
                "id": "0yn3etml",
                "name": "key",
                "type": "select",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "values": [
                        "general",
                        "timetable",
                        "menu",
                        "news",
                        "links",
                        "topics"
                    ]
                }
            }
        ],
        "indexes": [],
        "listRule": null,
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    }
]
```
