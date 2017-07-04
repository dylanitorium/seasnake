import { exec } from 'child_process';

/**
 *
 * @param command
 */
const execPromise = (command) => (
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => ((error) ? reject(error) : (stderr) ? resolve(stderr) :  resolve(stdout)))
  })
);

/**
 * Docker volume backups and restoration
 */
export default class Seasnake {
  /**
   *
   * @param volumeName
   * @param composePrefix
   * @param volumeDir
   * @param backupDirsea
   */
  constructor(volumeName) {
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
  export(name) {
    return execPromise(
      `docker run --rm \\
        --volume ${this.volumeName}:/${this.volumeName} \\
        --volume $(pwd):/tmp \\
        ubuntu \\
        tar cvf /tmp/${name}.tar /${this.volumeName}`
    );
  }

  /**
   * Does the opposite of the above
   *
   * @param name
   * @returns {*}
   */
  import(name) {
    return execPromise(
      `docker run --rm \\
        --volume ${this.volumeName}:/${this.volumeName} \\
        --volume $(pwd):/tmp \\
        ubuntu \\
        tar xvf /tmp/${name}.tar -C /${this.volumeName} --strip 1`
    );
  }
}
