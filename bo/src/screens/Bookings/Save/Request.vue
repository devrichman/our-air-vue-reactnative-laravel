<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h2>
          <service-icon :code="booking.service.code"></service-icon>
          Dossier #{{ booking.id }}
          <small>
            / {{ booking.client.firstname }} {{ booking.client.lastname }}
          </small>
        </h2>
      </el-col>
      <el-col :span="12" align="right">
        <h2>
          {{ booking.status.label }}
        </h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <h4>Créé le : {{ booking.created_at | datetime }}</h4>
      </el-col>
      <el-col :span="6">
        <h4>Modifié le : {{ booking.updated_at | datetime }}</h4>
      </el-col>
    </el-row>
    <el-collapse v-model="accordion">
      <el-collapse-item
        :title="'Segments (' + booking.request.segments.length + ')'"
        name="segments"
      >
        <segment-list :list="booking.request.segments" no-action></segment-list>
      </el-collapse-item>
      <el-collapse-item
        :title="'Catégories (' + booking.request.categories.length + ')'"
        name="categories"
      >
        <el-row
          v-for="category in booking.request.categories"
          :key="category.id"
          :span="24"
          :gutter="20"
        >
          <el-col :span="3">
            <img
              class="category-picture"
              :src="category.assets[0].full_path"
              :alt="category.assets[0].file_name"
            />
          </el-col>
          <el-col :span="19">
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
          </el-col>
          <el-col :span="24">
            <el-divider />
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item
        :title="'Options (' + booking.request.options.length + ')'"
        name="options"
      >
        <el-tag
          v-for="option in booking.request.options"
          :key="option.id"
          :span="24"
          :gutter="20"
          class="option"
        >
          {{ option.label }}
        </el-tag>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import ServiceIcon from '@/components/ServiceIcon'
import SegmentList from '../../../components/SegmentList'

export default {
  name: 'BookingSaveRequest',
  components: { SegmentList, ServiceIcon },
  props: {
    booking: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      accordion: ['segments', 'categories', 'options']
    }
  },
  computed: {},
  mounted: function() {},
  methods: {}
}
</script>

<style scoped>
h2,
h3 {
  margin: 10px 0;
}

.segment {
  text-transform: uppercase;
}

.option {
  margin: 0 10px;
}

.category-picture {
  width: 100%;
}
</style>
