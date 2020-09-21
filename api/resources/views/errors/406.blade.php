@extends('errors::minimal')

@section('title', __('Not Acceptable'))
@section('code', '406')
@section('message', __($exception->getMessage() ?: 'Not Acceptable Accept Headers'))
