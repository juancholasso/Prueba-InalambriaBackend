import Logger from '../imports/Logger';
import ValidatorModels from '../helpers/ValidatorModels';
import ValidatorFiles from '../helpers/ValidatorFiles';
import FileHelper from '../helpers/FileHelper';
import GeneralHelper from '../helpers/GeneralHelper';

/**
 * Services for app web
 */

class BaseService{

    constructor(){
        this.validatorModels = ValidatorModels;
        this.validatorFiles = ValidatorFiles;
        this.logger = Logger.getLogger();
        this.fileHelper = FileHelper;
        this.generalHelper = GeneralHelper;
    }
}

module.exports = BaseService;
