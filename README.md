# seasnake

## installation

```bash
$ npm install --save seasnake
```

## usage 

### exporting
```js
import Seasnake from 'seasnake';

const seasnake = new Seasnake('dockercomposeprefix_volumename');

seasnake.export('backup-file.tar');
```

### importing
```js
import Seasnake from 'seasnake';

const seasnake = new Seasnake('dockercomposeprefix_volumename');

seasnake.import('backup-file.tar');
```
_Note: the backup file is relative to the working directory but cannot be in a parent directory (eg. ../backup-file.tar)_
