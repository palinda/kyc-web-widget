// import and register your component(s)

const entryComponents = [

];

function propsToObj(props) {

    var properties = {};
    for(var key in props) {
        var property = props[key];
        var prp = {'default': property['default']};
        switch(property['type']) {
            case String: {
                prp['type'] = 'text';
                break;
            }
            case Number: {
                prp['type'] = 'number';
                break;
            }
            default: {
                prp['type'] = 'text';
            }
        }
        properties[key] = prp;
    }
    return properties;
}

export default function RegisterElements (){
        const array = [];
        entryComponents.forEach( el => {
            array.push({
                element : el,
                tag: el.name,
                icon: el.icon,
                group: el.group == undefined ? 'element' : el.group,
                properties: propsToObj(el.props)
            });
        });
        return array;
};

