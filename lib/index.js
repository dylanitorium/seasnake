'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _child_process = require('child_process');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * @param command
 */
var execPromise = function execPromise(command) {
  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)(command, function (error, stdout, stderr) {
      return error ? reject(error) : stderr ? resolve(stderr) : resolve(stdout);
    });
  });
};

/**
 * Docker volume backups and restoration
 */

var Seasnake = function () {
  /**
   *
   * @param volumeName
   * @param composePrefix
   * @param volumeDir
   * @param backupDirsea
   */
  function Seasnake(volumeName) {
    _classCallCheck(this, Seasnake);

    this.volumeName = volumeName;
  }

  /**
   * This runs an ubuntu docker container which will mount the target volume onto an internal directory.
   * The working directory is also then mounted as another volume. The target volume directory will be wrapped in tar
   * and to our working directory mount with a specified name.
   *
   * Once this operation is complete, the ubuntu docker container will be removed.
   *
   * @param name
   * @returns {*}
   */


  _createClass(Seasnake, [{
    key: 'export',
    value: function _export(name) {
      return execPromise('docker run --rm \\\n        --volume ' + this.volumeName + ':/' + this.volumeName + ' \\\n        --volume $(pwd):/tmp \\\n        ubuntu \\\n        tar cvf /tmp/' + name + ' /' + this.volumeName);
    }

    /**
     * Does the opposite of the above
     *
     * @param name
     * @returns {*}
     */

  }, {
    key: 'import',
    value: function _import(name) {
      return execPromise('docker run --rm \\\n        --volume ' + this.volumeName + ':/' + this.volumeName + ' \\\n        --volume $(pwd):/tmp \\\n        ubuntu \\\n        tar xvf /tmp/' + name + ' -C /' + this.volumeName + ' --strip 1');
    }
  }]);

  return Seasnake;
}();

exports.default = Seasnake;