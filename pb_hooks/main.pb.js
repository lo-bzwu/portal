
onRecordAfterAuthWithOAuth2Request((e) => {
    // console.log(e.httpContext)
    // console.log(e.providerName)
    // console.log(e.providerClient)
    // console.log(e.record) // could be null
    // console.log(e.isNewRecord)

    if (e.record?.introComplete) return;

    const institutionName = "BZWU";
    const tenantIndex = e.oAuth2User.name.indexOf(institutionName);
    const isLocalTenant = tenantIndex !== -1;
    const givenName = e.oAuth2User.rawUser.givenName;
    const surname = e.oAuth2User.rawUser.surname
    e.record.set('isLocalTenant', isLocalTenant);
    e.record.set('firstName', givenName);
    e.record.set('lastName', surname);
    e.record.set('classes', []);
    e.record.set('_raw', e.oAuth2User);
    e.record.set('userSelectedClasses', []);
    e.record.setUsername(surname.slice(0, 2).toUpperCase() + givenName.slice(0, 2).toUpperCase() + "-" + e.oAuth2User.id.slice(0, 4));

    const save = () => $app.dao().saveRecord(e.record);

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

    e.record.set('isLocalStudent', true);
    e.record.set('classes', classes);
    if (e.isNewRecord) e.record.set('userSelectedClasses', classes);

    return save()

})