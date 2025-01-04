
onRecordAuthWithOAuth2Request((e) => {
    // console.log(e.httpContext)
    // console.log(e.providerName)
    // console.log(e.providerClient)
    // console.log(e.record) // could be null
    // console.log(e.isNewRecord)

    const institutionName = "BZWU";
    const tenantIndex = e.oAuth2User.name.indexOf(institutionName);
    const isLocalTenant = tenantIndex !== -1;
    const givenName = e.oAuth2User.rawUser.givenName;
    const surname = e.oAuth2User.rawUser.surname

    if (!e.record) {
      e.record = new Record($app.findCollectionByNameOrId("users"))
    }
    
    const previousUserSelectedClasses = e.record.get("userSelectedClasses");
    const hasUserSelectedClasses = Array.isArray(previousUserSelectedClasses) && previousUserSelectedClasses?.length > 0

    e.record.set('isLocalTenant', isLocalTenant);
    e.record.set('password', Math.random().toString(32));
    e.record.set('firstName', givenName);
    e.record.set('lastName', surname);
    if (!hasUserSelectedClasses) e.record.set('userSelectedClasses', []);

    e.record.set('classes', []);
    const userNameSuffix = '-' + surname.slice(0, 2).toUpperCase() + givenName.slice(0, 2).toUpperCase() + "-" + e.oAuth2User.id.slice(0, 4)
    e.record.set("username", (isLocalTenant ? 'teach' : 'ext') + userNameSuffix);

    const save = () => $app.save(e.record);

    if (!isLocalTenant) return save();

    e.record.set('teacherCode', surname.slice(0, 1).toUpperCase() + surname.slice(1, 2).toLowerCase() + givenName.slice(0, 1).toUpperCase() + givenName.slice(1, 2).toLowerCase())

    const addition = e.oAuth2User.name.slice(tenantIndex + institutionName.length + 1);
    if (!addition.length) {
        return save()
    }

    const classes = addition.split(" ");
    if (classes.length === 0) {
        return save()
    }

    e.record.set('username', 'stud' + userNameSuffix);
    e.record.set('isLocalStudent', true);
    e.record.set('classes', classes);
    if (!hasUserSelectedClasses) e.record.set('userSelectedClasses', classes);

    return save()

})

onRecordCreate((e) => {
    const pushover_user = process.env.PUSHOVER_USER
    const pushover_token = process.env.PUSHOVER_TOKEN;
    if (!pushover_user || !pushover_token) return;

    $http.send({
        url: "https://api.pushover.net/1/messages.json",
        method: "POST",
        body: JSON.stringify({ token: pushover_token, user: pushover_user, message: "Ein Eintrag in der Kollektion " + e.record.collection().name + " wurde eingereicht." }),
        headers: { "content-type": "application/json" },
        timeout: 120, // in seconds
    })
}, "submissions", "url_submissions", "crash_logs")
