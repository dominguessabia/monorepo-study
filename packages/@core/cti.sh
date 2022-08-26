#!/bin/sh

npm run cti create './src/@seedwork/application' -- -i '*spec.ts' -b && 
npm run cti create './src/@seedwork/domain' -- -i '*spec.ts' -b  && 

npm run cti create './src/calculator/application' -- -i '*spec.ts' -b  && 
npm run cti create './src/calculator/domain' -- -i '*spec.ts' -b  && 
npm run cti create './src/calculator/infra' -- -i '*spec.ts' -b 

