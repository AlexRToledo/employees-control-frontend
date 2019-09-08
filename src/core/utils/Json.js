class Json {

    validate(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    dataForImport(str) {
        let json_data = JSON.parse(str);

        let data_import = [];

        Object.entries(json_data).map((value, key) => {
            return data_import.push({name: value[0], length: value[1].length});
        });

        return data_import;
    }
}

export default Json;