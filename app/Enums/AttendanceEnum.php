<?php

namespace App\Enums;

enum AttendanceEnum: string
{
    case ABSENCE_HOME = '1';
    case ABSENCE_VACATION = '2';
    case ABSENCE_PARENTS_ACTIVITY = '3';
    case ABSENCE_SICK = '4';
    case ABSENCE_APPOINTMENT = '5';
    case ABSENCE_SCHOOL_ACTIVITY = '6';
    case ABSENCE_NO_EXCUSE = '7';
    case TARDINESS_NO_EXCUSE = '8';
    case TARDINESS_HOME = '9';
    case TARDINESS_TRANSPORTATION = '10';
    case TARDINESS_SICK = '11';
    case TARDINESS_APPOINTMENT = '12';

    public function label()
    {
        return match ($this->value) {
            self::ABSENCE_HOME->value => 'Situación  en el hogar',
            self::ABSENCE_VACATION->value => 'Determinación en el hogar (viaje)',
            self::ABSENCE_PARENTS_ACTIVITY->value => 'Actividad con padres (open house)',
            self::ABSENCE_SICK->value => 'Enfermedad',
            self::ABSENCE_APPOINTMENT->value => 'Cita',
            self::ABSENCE_SCHOOL_ACTIVITY->value => 'Actividad educativa del colegio',
            self::ABSENCE_NO_EXCUSE->value => 'Sin excusa',
            self::TARDINESS_NO_EXCUSE->value => 'Sin excusa',
            self::TARDINESS_HOME->value => 'Situacion en el hogar',
            self::TARDINESS_TRANSPORTATION->value => 'Problem de transporte',
            self::TARDINESS_SICK->value => 'Enfermedad',
            self::TARDINESS_APPOINTMENT->value => 'Cita',
        };
    }

    public function type()
    {
        return match ($this->value) {
            self::ABSENCE_HOME->value => 'absence',
            self::ABSENCE_VACATION->value => 'absence',
            self::ABSENCE_PARENTS_ACTIVITY->value => 'absence',
            self::ABSENCE_SICK->value => 'absence',
            self::ABSENCE_APPOINTMENT->value => 'absence',
            self::ABSENCE_SCHOOL_ACTIVITY->value => 'absence',
            self::ABSENCE_NO_EXCUSE->value => 'absence',
            self::TARDINESS_NO_EXCUSE->value => 'tardiness',
            self::TARDINESS_HOME->value => 'tardiness',
            self::TARDINESS_TRANSPORTATION->value => 'tardiness',
            self::TARDINESS_SICK->value => 'tardiness',
            self::TARDINESS_APPOINTMENT->value => 'tardiness'
        };

    }

    public static function get($enumValue)
    {
        return match ($enumValue) {
            self::ABSENCE_HOME->value => self::ABSENCE_HOME,
            self::ABSENCE_VACATION->value => self::ABSENCE_VACATION,
            self::ABSENCE_PARENTS_ACTIVITY->value => self::ABSENCE_PARENTS_ACTIVITY,
            self::ABSENCE_SICK->value => self::ABSENCE_SICK,
            self::ABSENCE_APPOINTMENT->value => self::ABSENCE_APPOINTMENT,
            self::ABSENCE_SCHOOL_ACTIVITY->value => self::ABSENCE_SCHOOL_ACTIVITY,
            self::ABSENCE_NO_EXCUSE->value => self::ABSENCE_NO_EXCUSE,
            self::TARDINESS_NO_EXCUSE->value => self::TARDINESS_NO_EXCUSE,
            self::TARDINESS_HOME->value => self::TARDINESS_HOME,
            self::TARDINESS_TRANSPORTATION->value => self::TARDINESS_TRANSPORTATION,
            self::TARDINESS_SICK->value => self::TARDINESS_SICK,
            self::TARDINESS_APPOINTMENT->value => self::TARDINESS_APPOINTMENT,
            default => null
        };
    }

    public function labelWithType()
    {
        return $this->label().' ('.$this->type().')';

    }
}
