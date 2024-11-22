<?php

Schedule::command('telescope:prune --hours=48')->description('Delete entries from telescope tables daily')->daily();
