import CONFIGS from '../config/configs';
import _ from 'lodash';
export default function getFilterObj(GFilterData, globalFilterData,page ) {
    let newGFilterData = _.cloneDeep(GFilterData);

    /* Filter Customization */
    let tempValue = [], filters = {};
    if (newGFilterData && newGFilterData['DDRs'] && newGFilterData['DDRs'].length > 0) {
        let tvalue = newGFilterData['DDRs'];
        let tempDDR = []
        for (var i = 0; i < tvalue.length; i++) {
            tempDDR = globalFilterData[1]['master'][tvalue[i]];
            for(var j=0; j < tempDDR.length;j++){
               tempValue.push(tempDDR[j]);
            }
        }
        filters['tenantId'] = tempValue;
    }

    if (newGFilterData && newGFilterData['ULBS'] && newGFilterData['ULBS'].length > 0) {
        
        for (var i = 0; i < newGFilterData['ULBS'].length; i++) {
            tempValue.push('pb.' + newGFilterData['ULBS'][i].toLowerCase());
        }
        filters['tenantId'] = tempValue;
    }

    if (newGFilterData && newGFilterData['duration'] && Object.keys(_.get(newGFilterData, 'duration.value')).length > 0) {
        filters['duration'] = newGFilterData['duration']['value'];
        let startDate = _.get(newGFilterData, 'duration.value.startDate') * 1000;
        let endDate = _.get(newGFilterData, 'duration.value.endDate') * 1000;
        _.set(filters, 'duration.endDate', endDate)
        _.set(filters, 'duration.startDate', startDate)
    }

    switch(page){
      case 'propertyTax':
        filters['modulelevel'] = 'PT';
        break;
      case 'tradeLicense':
        filters['modulelevel'] = 'TL';
        break;
    }
    if (newGFilterData && newGFilterData['Services'] && newGFilterData['Services'].length > 0) {
        filters['modulelevel'] = newGFilterData['Services'];
    }

    return filters
}