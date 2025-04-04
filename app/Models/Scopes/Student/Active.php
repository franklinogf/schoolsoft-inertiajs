<?php

declare(strict_types=1);

namespace App\Models\Scopes\Student;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

final class Active implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        $table = $model->getTable();
        $builder->where("{$table}.fecha_baja", '0000-00-00');
    }
}
